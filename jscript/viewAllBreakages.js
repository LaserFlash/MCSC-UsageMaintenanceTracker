//create firebase reference
var dbRef = new Firebase("https://u23-breakages.firebaseio.com/");
var issueRef = dbRef.child('issues');

issueRef.on("child_added",function(snap){
    breakageHtmlFromObject(snap);
});

//prepare conatct object's HTML
function breakageHtmlFromObject(data) {
    var html = '';
    var issue = data.val();
    var key = data.key();

    var date = new Date(issue.breakage.timestamp);

    html += '<div class= "breakages-added mdl-card mdl-cell mdl-shadow--4dp mdl-cell--12-col-phone mdl-cell--4-col-tablet mdl-cell--3-col-desktop">';
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
        "Date Reported: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
        '<br />' +
        '<br />' +
        '</div>';
    html += '</div>';
    console.log(issue);
    $('#breakageDiv').append(html);
}
