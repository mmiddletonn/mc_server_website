document.addEventListener('DOMContentLoaded', function() {
    fetchServerStatus();
});

function fetchServerStatus() {
    // You might need a server-side proxy to handle CORS issues.
    const apiUrl = 'https://api.mcsrvstat.us/2/mc.matt-middleton.com';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const statusElement = document.getElementById('serverStatus');
            if (data.online) {
                statusElement.textContent = `Server is Online. Players: ${data.players.online}/${data.players.max}`;
            } else {
                statusElement.textContent = 'Server is Offline.';
            }
        })
        .catch(() => {
            document.getElementById('serverStatus').textContent = 'Failed to retrieve server status.';
        });
}

function copyIp() {
    let copyText = "mc.matt-middleton.com";
    if (navigator.clipboard) {
        navigator.clipboard
        .writeText(copyText)
        .catch((error) => {
            console.error(
                `Failed to copy "${copyText}" to clipboard: ${error}`
            );
        });
      } else {
        unsecuredCopyToClipboard(copyText);
      }
    
}

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus({preventScroll:true});
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }