import { useEffect } from 'react';

const ZendeskChat = () => {
  useEffect(() => {
    const loadZendesk = () => {
      const script = document.createElement('script');
      script.id = 'ze-snippet';
      script.src = 'https://static.zdassets.com/ekr/snippet.js?key=6ad75b0f-d085-4cae-9a7a-48abeb69b973';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.zE('webWidget:on', 'chat:connected', () => {
          window.zE('webWidget:on', 'chat:message', (event) => {
            if (event.nick === 'agent') {  
              window.zE('webWidget', 'open'); 
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
    };
  }, []);

  return null;
};

export default ZendeskChat;
