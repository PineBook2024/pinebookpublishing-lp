const useHubspotForm = () => {
  const portalId = "46007295";
  const contactFormId = "c2bfbd83-91ed-45fd-9d8a-20e418611ce4";
  const contactFormId2 = "eb8f9475-6622-4c8d-b3fb-6d6af8889398";

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

  const submitPopupContactForm = async (email, ful_name, phoneNumber, message, service) => {
    try {
      const formResponse = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${contactFormId2}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            submittedAt: Date.now(),
            fields: [
              {
                name: "ful_name",
                value: ful_name,
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
                name: "service",
                value: service,
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
    submitPopupContactForm,
  };
};

export default useHubspotForm;
