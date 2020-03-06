import _ from 'lodash';

// 已知至少兼容：Chrome、IE10+
export const fileDownload = (fileUrl, fileName, onPercent, onFinish) =>
  new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileUrl, true);
    xhr.responseType = 'blob';

    xhr.addEventListener(
      'progress',
      evt => {
        if (evt.lengthComputable) {
          const percent = _.toInteger((100 * evt.loaded) / evt.total);
          onPercent(percent, fileName, fileUrl);
        }
      },
      false,
    );
    // xhr.onload = () => {
    //   if (xhr.status === 200) {
    //     resolve(xhr.response);
    //   } else {
    //     self.setState({ status: 'exception' });
    //   }
    // };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.response);
      } else {
        // self.setState({ status: 'exception' });
      }
    };

    xhr.send();
  }).then(blob => {
    if (
      window.navigator.msSaveOrOpenBlob ||
      typeof window.navigator.msSaveBlob !== 'undefined'
    ) {
      window.navigator.msSaveBlob(
        new Blob([blob], {
          type: 'application/force-download',
        }),
        fileName,
      );
    } else {
      const link = document.createElement('a');
      // const body = document.querySelector('body');

      link.href = window.URL.createObjectURL(blob);
      link.target = '_self';
      link.download = fileName;

      // https://stackoverflow.com/questions/53048734/safari-12-wont-download-a-pdf-blob
      const evt = document.createEvent('MouseEvents');
      evt.initEvent('click', true, false);
      link.dispatchEvent(evt);

      // fix Firefox
      // link.style.display = 'none';
      // body.appendChild(link);
      //
      // link.click();
      // body.removeChild(link);

      // 释放创建的URL对象
      window.URL.revokeObjectURL(link.href);
    }

    if (onFinish) {
      onFinish(fileName, fileUrl);
    }
  });
