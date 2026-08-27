function toggleSidebar() {
    document.getElementById('appSidebar').classList.toggle('collapsed');
}

function autoGrow(element) {
    element.style.height = '24px';
    element.style.height = (element.scrollHeight) + 'px';
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function toggleUploadPopup(event) {
    if(event) event.stopPropagation();
    closeDotsDropdown();
    const popup = document.getElementById('uploadPopup');
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}

function toggleDotsDropdown(event) {
    if(event) event.stopPropagation();
    const uploadPopup = document.getElementById('uploadPopup');
    if(uploadPopup) uploadPopup.style.display = 'none';
    const dropdown = document.getElementById('dotsDropdown');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

function closeDotsDropdown() {
    const dropdown = document.getElementById('dotsDropdown');
    if(dropdown) dropdown.style.display = 'none';
}

function handleMenuAction(action) {
    closeDotsDropdown();
    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    inner.insertAdjacentHTML('beforeend', `
        <div class="message-row">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">Menu Action: ${action}</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai">Successfully executed <b>${action}</b> for your active session. All parameters have been updated.</div>
            </div>
        </div>
    `);
    document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
}

function handleUpload(type) {
    document.getElementById('uploadPopup').style.display = 'none';
    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    inner.insertAdjacentHTML('beforeend', `
        <div class="message-row">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">Selected tool: [${type}]</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai">The <b>${type}</b> module has been successfully loaded into your workspace. Ready for your instructions.</div>
            </div>
        </div>
    `);
    document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
}

function executeFeature(featureName) {
    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    inner.insertAdjacentHTML('beforeend', `
        <div class="message-row">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">Activated feature: ${featureName}</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai">Vortex AI has successfully initialized the <b>${featureName}</b> module. You can now execute advanced queries and analyses under this mode.</div>
            </div>
        </div>
    `);
    document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
}

function startJazibVoice() {
    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        const input = document.getElementById('userInput');
        input.placeholder = "Listening... Speak now...";

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            input.value = speechResult;
            autoGrow(input);
            input.placeholder = "Ask Vortex AI or type a topic...";
        };

        recognition.onerror = function() {
            input.placeholder = "Ask Vortex AI or type a topic...";
        };

        recognition.onend = function() {
            input.placeholder = "Ask Vortex AI or type a topic...";
        };

        recognition.start();
    } catch(e) {
        alert("Voice feature initialized. Make sure mic permission is allowed.");
    }
}

function startNewChat() {
    document.getElementById('chatContentInner').innerHTML = `
        <div class="welcome-center" id="welcomeCenter">
            <h1>New Chat Session.</h1>
            <p>What would you like to create, Jazib?</p>
        </div>
    `;
}

function loadHistory(title) {
    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    inner.innerHTML = `
        <div class="message-row">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">Load history: ${title}</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai">Successfully loaded <b>${title}</b> session history. All writing and code tools are online.</div>
            </div>
        </div>
    `;
}

// INTELLIGENT QUERY ROUTER & PARSER
function generateEnglishResponse(query) {
    const q = query.toLowerCase().trim();

    if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'salam') {
        return "Hello Jazib! I am Vortex AI. How can I assist you with your workspace tasks, writing projects, or coding queries today?";
    }
    else if (q === 'ok' || q === 'okay' || q === 'cool' || q === 'thanks' || q === 'great' || q === 'awesome') {
        return "Glad to hear that! What would you like to explore or build next?";
    }
    else if (q.includes('who made it') || q.includes('who created you') || q.includes('who built this')) {
        return "This elite Vortex AI workspace was built and created by <b>Jazib</b>! It is fully custom-designed to handle high-speed coding, document structuring, and smart task automation.";
    }
    else if (q.includes('download') || q.includes('save image') || q.includes('where to download')) {
        return `To download your generated asset or canvas output, Jazib, simply click on the <b>Three Dots (⋮)</b> in the top right navbar and select <b>Download</b>, or right-click directly on the media studio canvas to save it to your device!`;
    }
    else if (q.includes('image') || q.includes('picture') || q.includes('generate image') || q.includes('create image')) {
        return `Image generation request received, Jazib! Processing prompt: <i>"${query}"</i>.<br><br><div style="margin-top:10px; padding:20px; background:#090a0f; border:1px solid var(--border-glass); border-radius:12px; text-align:center;"><span style="color:#818cf8; font-weight:700;">🖼️ Nano Banana Image Studio</span><br><p style="font-size:13px; color:var(--text-muted); margin-top:6px;">Your visual prompt has been rendered successfully through the workspace media canvas. Ready for refinement or download!</p></div>`;
    }
    else if (q.includes('simple words') || q.includes('in simple') || q.includes('simpler')) {
        return "Sure thing, Jazib! Let me break it down in much simpler terms: Vortex AI is basically a smart digital helper on your screen that lets you write paragraphs, code websites, and handle tasks easily using a clean dark-mode interface.";
    }
    else if (q.includes('a31') || (q.includes('a05') && q.includes('a31'))) {
        return `Here is the precise comparison between the <b>Samsung Galaxy A05</b> and the <b>Samsung Galaxy A31</b>:<br><br>• <b>Display & Build:</b> The Galaxy A31 features a superior <b>Super AMOLED</b> display (6.4 inches) with Full HD+ resolution, whereas the Galaxy A05 uses a basic <b>PLS LCD</b> (6.7 inches) with HD+ resolution.<br>• <b>Cameras:</b> The A31 comes with a versatile quad-camera setup (48MP main + 8MP ultrawide + macro + depth), while the A05 features a simpler dual-camera setup (50MP main + 2MP depth) without an ultrawide lens.<br>• <b>Processor & Performance:</b> The A05 runs on a newer MediaTek Helio G85 chipset which handles basic everyday tasks efficiently, while the A31 is powered by the Helio P65.<br>• <b>Battery & Charging:</b> Both feature a 5,000 mAh battery, but the A05 supports 25W fast charging compared to the A31's 15W charging.<br><br><b>Summary:</b> Choose the <b>A31</b> for a much better screen quality and ultrawide camera, or the <b>A05</b> for a newer processor and faster charging support!`;
    }
    else if (q.includes('difference') || q.includes('vs') || q.includes('compare')) {
        return `Detailed analytical comparison request received, Jazib: <i>"${query}"</i>.<br><br>• <b>Core Architecture:</b> Comparing these distinct entities requires evaluating their core hardware specifications, release tiers, and primary use cases.<br>• <b>Performance & Metrics:</b> While one focuses on high-efficiency rendering and modern component integration, the other is tailored for balanced performance and everyday reliability.<br><br><b>Analytical Verdict:</b> Both serve entirely different target segments. Let me know if you would like a detailed tabular breakdown or specific metric highlights for this comparison!`;
    }
    else if (q.includes('subject') && q.includes('predicate')) {
        return `Here is the clear difference regarding <b>"${query}"</b>:<br><br>• <b>The Subject</b> is the part of a sentence that names the person, place, thing, or idea that is doing or being something.<br>• <b>The Predicate</b> is the part that tells us something about the subject, containing the action or state of being.`;
    }
    else if (q.includes('grammar') || q.includes('noun') || q.includes('verb') || q.includes('clause')) {
        return `Regarding your grammar query on <b>"${query}"</b>: In structured English composition, understanding parts of speech and sentence structure is essential for building clear clauses and meaningful expressions.`;
    }
    else if (q.includes('vortex ai')) {
        return "<b>Vortex AI</b> is an advanced, high-performance executive workspace designed to streamline multi-disciplinary workflows, ranging from deep content writing and academic thesis generation to complex code synthesis.";
    }
    else if (q.includes('paragraph') || q.includes('write') || q.includes('hypertext')) {
        return `Here is a detailed and professionally structured response for <b>"${query}"</b>:<br><br>Hypertext is a foundational concept in modern digital information systems, referring to text displayed on a computer or other electronic device with references (hyperlinks) to other text that the reader can immediately access. Unlike traditional printed media, it introduces a dynamic, non-linear architecture where users can seamlessly navigate between interconnected nodes of information.`;
    }
    else if (q.includes('code') || q.includes('html') || q.includes('css') || q.includes('javascript')) {
        return `Here is the requested code solution for <b>"${query}"</b>:<br><br><pre style="background:#090a0f; padding:12px; border-radius:8px; overflow-x:auto; font-family:'JetBrains Mono', monospace; font-size:13px; color:#a855f7;"><code>&lt;!-- Optimized Vortex Component --&gt;\n&lt;div class="vortex-container"&gt;\n    &lt;h2&gt;Workspace Active&lt;/h2&gt;\n    &lt;p&gt;Successfully compiled for Jazib (PRO)&lt;/p&gt;\n&lt;/div&gt;</code></pre>`;
    }
    else {
        return `Comprehensive analysis generated for your query, Jazib: <i>"${query}"</i>.<br><br>Based on your input parameters, this topic spans advanced technical concepts and multi-variable criteria. Within this modular workspace configuration, the engine evaluates structural variables, comparative parameters, and contextual syntax to provide an optimal response. Let me know if you would like me to expand further on any specific sub-section!`;
    }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if(!text) return;

    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    
    const userRowID = 'msg-' + Date.now();
    inner.insertAdjacentHTML('beforeend', `
        <div class="message-row" id="${userRowID}">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">${text}</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai" id="ai-resp-${userRowID}">
                    <div class="thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    `);

    input.value = '';
    input.style.height = '24px';

    const container = document.getElementById('chatContainer');
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
        const aiBubble = document.getElementById(`ai-resp-${userRowID}`);
        if(aiBubble) {
            aiBubble.innerHTML = generateEnglishResponse(text);
            container.scrollTop = container.scrollHeight;
        }
    }, 1200);
}

function handleKeyPress(e) {
    if(e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

document.getElementById('sendBtn').addEventListener('click', sendMessage);

window.onclick = function(event) {
    if (!event.target.matches('.tool-icon-btn') && !event.target.closest('.upload-popup')) {
        const popup = document.getElementById('uploadPopup');
        if (popup && popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
    }
    if (!event.target.matches('.top-three-dots') && !event.target.closest('.dots-dropdown')) {
        closeDotsDropdown();
    }
}
