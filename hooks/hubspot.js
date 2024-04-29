const useHubspotForm = () => {
    const portalId = "46007295";
    const contactFormId = "c2bfbd83-91ed-45fd-9d8a-20e418611ce4";
  
    const submitContactForm = async (email, full_name, phoneNumber, message) => {
      try {
        const formResponse = await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${contactFormId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              submittedAt: Date.now(),
              fields: [
                {
                  name: "full_name",
                  value: full_name,
                },
                {
                  name: "email",
                  value: email,
                },
                {
                    name: "phone",
                    value: phoneNumber,
                  },
                {
                  name: "message",
                  value: message,
                },
              ],
            }),
          }
        );
  
        const formDataResponse = await formResponse.json();
  
        return formDataResponse.inlineMessage;
      } catch (error) {
        console.error(error);
      }
    };
    return {
      submitContactForm,
    };
  };
  
  export default useHubspotForm;
  