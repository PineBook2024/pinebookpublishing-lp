import React, { useEffect } from 'react';

const WhatsAppChat = () => {
  useEffect(() => {
    const updateDateTime = () => {
      const datetime = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      document.querySelectorAll(".time_whatsapp").forEach(el => {
        el.innerHTML = datetime;
      });
    };

    updateDateTime();

    document.addEventListener("click", (event) => {
      if (event.target.id === "send-it") {
        const chatInput = document.getElementById("chat-input");
        if (chatInput.value !== "") {
          const phone = "+923269912683";
          const text = chatInput.value;
          const url = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            ? `whatsapp://send?phone=${phone}&text=${text}`
            : `https://web.whatsapp.com/send?phone=${phone}&text=${text}`;
          window.open(url, "_blank");
        }
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("informasi")) {
        const number = event.target.querySelector(".my-number").textContent;
        const name = event.target.querySelector(".chat-nama").textContent;
        const label = event.target.querySelector(".chat-label").textContent;

        document.getElementById("get-number").innerHTML = number;
        document.getElementById("get-nama").innerHTML = name;
        document.getElementById("get-label").innerHTML = label;

        document.querySelector(".start-chat").classList.add("show");
        document.querySelector(".start-chat").classList.remove("hide");
        document.querySelector(".home-chat").classList.add("hide");
        document.querySelector(".home-chat").classList.remove("show");
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("close-chat")) {
        document.getElementById("whatsapp-chat").classList.add("hide");
        document.getElementById("whatsapp-chat").classList.remove("show");
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("blantershow-chat")) {
        document.getElementById("whatsapp-chat").classList.add("show");
        document.getElementById("whatsapp-chat").classList.remove("hide");
      }
    });

  }, []);

  return (
    <div id='whatsapp-chat' className='hide'>
      <div className='header-chat'>
        <div className='head-home'>
          <div className='info-avatar'><img src='/images/logo-2.svg' alt='Logo' /></div>
          <p><span className="whatsapp-name">The Nugsol</span><br /><small>Typically replies within an hour</small></p>
        </div>
        <div className='get-new hide'>
          <div id='get-label'></div>
          <div id='get-nama'></div>
        </div>
      </div>
      <div className='home-chat'></div>
      <div className='start-chat'>
        <div pattern="https://elfsight.com/assets/chats/patterns/whatsapp.png"
          className="WhatsappChat__Component-sc-1wqac52-0 whatsapp-chat-body">
          <div className="WhatsappChat__MessageContainer-sc-1wqac52-1 dAbFpq">
            <div style={{ opacity: 0 }} className="WhatsappDots__Component-pks5bf-0 eJJEeC">
              <div className="WhatsappDots__ComponentInner-pks5bf-1 hFENyl">
                <div className="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotOne-pks5bf-3 ixsrax"></div>
                <div className="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotTwo-pks5bf-4 dRvxoz"></div>
                <div className="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotThree-pks5bf-5 kXBtNt"></div>
              </div>
            </div>
            <div style={{ opacity: 1 }} className="WhatsappChat__Message-sc-1wqac52-4 kAZgZq">
              <div className="WhatsappChat__Text-sc-1wqac52-2 iSpIQi">Hi there 👋<br />How can I help you?</div>
            </div>
          </div>
        </div>
        <div className='blanter-msg'>
          <textarea id='chat-input' placeholder='Write a response' maxLength='120' rows='1'></textarea>
          <a href='javascript:void(0);' id='send-it'>
            <svg viewBox="0 0 448 448">
              <path d="M.213 32L0 181.333 320 224 0 266.667.213 416 448 224z" />
            </svg>
          </a>
        </div>
      </div>
      <div id='get-number'></div>
      <a className='close-chat' href='javascript:void(0);'>×</a>
    </div>
  );
};

export default WhatsAppChat;
