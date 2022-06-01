import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// export interface Props {
//     uriReceived: boolean;
//     onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
//     onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
//     onFileUpload: (event: FormEvent) => void;
// }

function FileUploads() {
  const [files, setFiles] = useState<File>();
  const [username, setUsername] = useState('');
  const [isFileReceived, setIsFileReceived] = useState(false);
  const [uriReceived, setUriReceived] = useState('');

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = (event.target as HTMLInputElement).files![0];
    setFiles(file);
  };

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const usernameTemp = (event.target as HTMLInputElement).value;
    setUsername(usernameTemp);
  };

  const onFileUpload = async (event: FormEvent) => {
    if (!files) {
      return alert('Please select a file');
    }
    if (!username) {
      return alert('Please enter a username');
    }
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', files, files.name);
    formData.append('username', username);
    console.log(formData);
    await axios
      .post(
        'https://emotion-recognizer-model.herokuapp.com/api/audio',
        formData
      )
      .then((res) => {
        setIsFileReceived(true);
        setUriReceived(res.data.uri);
      })
      .catch((err) => {
        console.log(err);
      });
      return setIsFileReceived(true);
  };
  return (
    <div>
      <div>FileUploads</div>
      <h3>File Upload using React!</h3>
      <form data-testid="login-form">
        <input type="file" name="files" onChange={onFileChange} />
        <input type="text" name="text" onChange={onTextChange} />
        <h4>Choose before Pressing the Upload button</h4>
        <button type="submit" onClick={onFileUpload}>Upload!</button>
        {
            isFileReceived &&
            <div>
                <h4>File Received!</h4>
                <p>{uriReceived}</p>
            </div>
        }
      </form>
    </div>
  );
}

export default FileUploads;
