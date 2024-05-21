const useHubspotForm = () => {
  const portalId = "46007295";
  const contactFormId = "c2bfbd83-91ed-45fd-9d8a-20e418611ce4";
  const contactFormId2 = "eb8f9475-6622-4c8d-b3fb-6d6af8889398";
  const contactFormId3 = "9e49a67a-75cc-4092-8879-3ec6dea29144";
  const contactFormId4 = "6c2fb77a-99f2-4cd9-acc0-22f4af0be9d5";
  const contactFormId5 = "eefad283-3140-4dbd-9ddb-e0384022165a";

  const submitMainContactForm = async (full_name, email, phoneNumber, message) => {
    try {
      const formResponse = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${contactFormId4}`,
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

  const submitContactForm = async (firstName, email, phone, message) => {
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
                name: "firstName",
                value: firstName,
              },
              {
                name: "email",
                value: email,
              },
              {
                name: "phone",
                value: phone,
              },
              // {
              //   name: "budgets",
              //   value: budgets,
              // },
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

  const submitPopupContactForm = async (ful_name, mail, phoneNumber, service, message) => {
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
                name: "mail",
                value: mail,
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
  const submitPopupContactFormScreen = async (ful_name, mail, phoneNumber, budget, message) => {
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
                name: "mail",
                value: mail,
              },
              {
                name: "phone",
                value: phoneNumber,
              },
              {
                name: "budget",
                value: budget,
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


  // Brand Forms
  const submitBrandMainContactForm = async (username, email, phoneNumber, message) => {
    try {
      const formResponse = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${contactFormId5}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            submittedAt: Date.now(),
            fields: [
              {
                name: "username",
                value: username,
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
    submitPopupContactForm,
    submitPopupContactFormScreen,
    submitMainContactForm,
    submitBrandMainContactForm
  };
};



export default useHubspotForm;
