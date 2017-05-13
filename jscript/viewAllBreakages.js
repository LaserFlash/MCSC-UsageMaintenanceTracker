/**
*   Create firebase reference
**/
var dbRef = new Firebase("https://u23-breakages.firebaseio.com/");
var issueRef = dbRef.child('issues');
var fixedRef = dbRef.child('fixed');

var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
  console.log("register dialog");
}


/**
*   Change displayed cards when new breakage added
**/
issueRef.on("child_added",function(snap){
    breakageHtmlFromObject(snap);
});

/**
*   Change displayed cards when breakage removed
**/
issueRef.on("child_removed",function(snap){
    removeHtml(snap);
});

/**
*   Remove a card bassed on breakage ID / Entry
**/
function removeHtml(data){
    var issue = data.val();
    key = data.key();
    $('#DIV_' + key).remove();
    console.log("Removed card" + '#DIV_' + key);
}

/**
*   Create card to display breakage
**/
function breakageHtmlFromObject(data) {
    var html = '';
    var issue = data.val();
    var key = data.key();
    var divID = "DIV_" + key;

    var date = new Date(issue.breakage.timestamp);

    html += '<div class= "breakages-added mdl-card mdl-cell mdl-shadow--4dp mdl-cell--12-col-phone mdl-cell--4-col-tablet mdl-cell--3-col-desktop" id="' + divID +'">';
    html += '<div class= "breakage-card mdl-card__title mdl-card--expand mdl-color--blue">' + '<h2 class="mdl-card__title-text">' + "Boat " + issue.breakage.boatID + '</h2>' + '</div>';
    html += '<div class="mdl-card__supporting-text mdl-color-text--grey-600">' +
        "Category: " + issue.breakage.category +
        '</br>' +
        "Breakage Details: " + issue.breakage.details  +
        '<br />' +
        '<br />' +
        "Reported by: " + issue.breakage.name +
        '<br />' +
        "Contact Email: " + issue.breakage.email +
        '<br />' +
        "Contact Mobile: " + issue.breakage.mobile +
        '<br />' +
        "Date Reported: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
        '<br />' +
        '<br />' +
        '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent fixBreakage" id=' + key + '>Fix</button>' +
        '</div>';
    html += '</div>';
    console.log(issue);
    $('#breakageDiv').append(html);
}

/**
*   Mark breakage as fixed
**/
$('#breakageDiv').on("click", '.fixBreakage', function(event) {
    //TODO Confirmation of removal & only remove if succesful
    event.preventDefault();

    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });

    dialog.querySelector('.fix').addEventListener('click', function() {
      dialog.close();
      issueRef.child(event.target.id).once('value', function(snap) {
          var item = snap.val();
          console.log("Item " + item);
          fixedRef.push({
                  breakage: {
                      boatID: item.breakage.boatID,
                      category: item.breakage.category,
                      details: item.breakage.details,
                      email: item.breakage.email,
                      mobile: item.breakage.mobile,
                      name: item.breakage.name,
                      timestampReported:item.breakage.timestamp,
                      timestampFixed: new Date().getTime(),
                  }
          });
          var snackbarContainer = document.querySelector('#toast');
          var data = {
              message: 'Breakage Marked as Fixed'
          };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);

          issueRef.child(event.target.id).remove();
          console.log("Moved " + event.target.id + " to fixed database");
      });
    });

});
