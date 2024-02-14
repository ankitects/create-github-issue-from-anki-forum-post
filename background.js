async function OpenGithubIssue(activeTab) {
    const [result] = await chrome.scripting.executeScript({
        target: {
            tabId: activeTab.id,
        },
        func: () => {
            const title = document.querySelector(".fancy-title").textContent.trim();
            const body = document.querySelector("#post_1 .cooked").textContent;
            return {
                title, body
            };
        }
    });
    let { title, body } = result.result;
    body = '> ' + body.replaceAll("\n", "\n> ") + `\n\nOriginally reported on ${activeTab.url}`;
    chrome.tabs.create(
        {
            url: `https://github.com/ankitects/anki/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`,
            active: true,
        });

}

chrome.action.onClicked.addListener((tab) => {
    OpenGithubIssue(tab);
});
