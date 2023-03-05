export const prepareFormFields = (form: any) => {
  let formData: any = {};

  for (let i = 0; i <= form.elements.length; i++) {
    try {
      if (form.elements[i].name) {
        let value = form.elements[i].value;
        if (form.elements[i].type === 'checkbox') {
          value = form.elements[i].checked;
        }
        if (form.elements[i].value.includes("/")) {
          const dateFormat = form.elements[i].value.split("/");
          if (dateFormat.length === 3) {
            value = dateFormat[2] + "-" + dateFormat[0] + "-" + dateFormat[1];
          }
        }
        let name = form.elements[i].name;

        if (form.elements[i].name.includes("multi-")) {
          name = name.replace("multi-", "");
          if (!formData[name]) {
            formData[name] = [];
          }

          if (value) {
            formData[name].push(value);
          }
          continue;
        }

        if (form.elements[i].name.includes("[]")) {
          name = name.replace("[]", "");
          if (!formData[name]) {
            formData[name] = [];
          }

          if (value) {
            formData[name].push(value);
          }
          continue;
        }

        if (!form.elements[i].name.includes("[]") && form.elements[i].name.includes("[") && form.elements[i].name.includes("]")) {
          let nameWoBrac = name.substr(0, name.indexOf('['));
          let index = name.slice(name.indexOf('[') + 1, name.lastIndexOf(']'));

          if (!formData[nameWoBrac]) {
            formData[nameWoBrac] = [];
          }
          
          if (typeof value !== 'undefined') {
            if (index.includes('*')) {
              let indexes = index.split('*');
              if (!formData[nameWoBrac][indexes[0]]) {
                formData[nameWoBrac][indexes[0]] = [];
              }
              formData[nameWoBrac][indexes[0]][indexes[1]] = value;
            } else {
              formData[nameWoBrac][index] = value;
            }
          }
          continue;
        }

        if (form.elements[i].name.includes("tagsInput-")) {
          name = name.replace("tagsInput-", "");
          if (!formData[name]) {
            formData[name] = [];
          }

          if (value) {
            formData[name] = value.split(',');
          }
          continue;
        }

        formData[name] = value;
      }
    } catch (e) {
      //
    }
  }

  return formData;
};