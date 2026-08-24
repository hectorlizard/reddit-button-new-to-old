// ==UserScript==
// @name         Reddit Button: New → Old
// @namespace    https://github.com/hectorlizard
// @version      1.5
// @description  Adds and maintains an ‘Old’ button that redirects to the old.reddit.com version of the current page
// @homepageURL  https://github.com/hectorlizard/reddit-button-new-to-old
// @downloadURL  https://raw.githubusercontent.com/hectorlizard/reddit-button-new-to-old/main/reddit-button-new-to-old.user.js
// @updateURL    https://raw.githubusercontent.com/hectorlizard/reddit-button-new-to-old/main/reddit-button-new-to-old.user.js
// @match        https://www.reddit.com/*
// @match        https://sh.reddit.com/*
// @run-at       document-idle
// ==/UserScript==

(function ensureClassicButton() {
	const BUTTON_ID = 'classic-reddit-button';

	function createButton() {
		const btn = document.createElement('button');
		btn.id = BUTTON_ID;
		btn.textContent = 'Old';
		btn.style.cssText = `
			margin-right: 8px;
			padding: 4px 10px;
			background: transparent;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-size: 11px;
			color: inherit;
		`;
		btn.addEventListener('click', () => {
			const newUrl = location.href.replace(/(?:www|sh)\.reddit\.com/, 'old.reddit.com');
			location.href = newUrl;
		});
		return btn;
	}

	function injectButton() {
		const advertise = document.querySelector('span[data-part="advertise"]');
		if (!advertise) return;

		const container = advertise.parentElement;
		if (!container || container.querySelector(`#${BUTTON_ID}`)) return;

		const button = createButton();
		container.insertBefore(button, advertise);
	}

	injectButton();

	const observer = new MutationObserver(() => {
		injectButton();
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
})();
