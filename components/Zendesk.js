import { useEffect } from 'react';

const ZendeskChat = ({ zendeskKey }) => {
  useEffect(() => {
    const loadZendesk = () => {
      const script = document.createElement('script');
      script.id = 'ze-snippet';
      script.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.zE('webWidget:on', 'chat:connected', () => {
          window.zE('webWidget:on', 'chat:message', (event) => {
            if (event.nick === 'agent') {
              window.zE('webWidget:get', 'chat:status', (status) => {
                if (status === 'closed') {
                  window.zE('webWidget', 'open');
                }
              });
            }
          });
        });
      };
    };

    if (!window.zE) {
      loadZendesk();
    }

    return () => {
      const script = document.getElementById('ze-snippet');
      if (script) {
        script.remove();
      }
      if (window.zE) {
        window.zE('webWidget', 'hide');
      }
    };
  }, [zendeskKey]);

  return null;
};

export default ZendeskChat;
