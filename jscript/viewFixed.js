/**
*   Create firebase reference
**/
var dbRef = new Firebase("https://u23-breakages.firebaseio.com/");
var issueRef = dbRef.child('issues');
var fixedRef = dbRef.child('fixed');

/**
*   Change displayed cards when breakage marked as fixed added
**/
fixedRef.on("child_added",function(snap){
    breakageHtmlFromObject(snap);
});

/**
*   Change displayed cards when breakage removed
**/
fixedRef.on("child_removed",function(snap){
    removeHtml(snap);
});

/**
*   Remove a card bassed on breakage ID / Entry
**/
function removeHtml(data){
    var issue = data.val();
    key = data.key();
    $('#DIV_' + key).remove();
}

/**
*   Create card to display breakage
**/
function breakageHtmlFromObject(data) {
    var html = '';
    var issue = data.val();
    var key = data.key();
    var divID = "DIV_" + key;

    var date = new Date(issue.breakage.timestampFixed);

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
        "Contact: " + issue.breakage.email +
        '<br />' +
        "Date Fixed: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
        '<br />' +
        '</div>';
    html += '</div>';
    console.log(issue);
    $('#breakageDiv').append(html);
}
