import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Box, TextInput, Button, Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import axios from 'axios';


function FormSong() {
  const [file, setFile] = useState<File>();
  const [isFileReceived, setIsFileReceived] = useState(false);
  const [uriReceived, setUriReceived] = useState('');
  const Form = useForm<{ username: string }>({
    initialValues: { username: '' },
    validate: (values: { username: string }) => ({
      username:
        values.username.length < 3 ? 'Username must be at least 3 characters long' : undefined,
    }),
  });

  function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
      ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
      : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[0]
      : theme.colors.gray[7];
  }

  function ImageUploadIcon({
    status,
    ...props
  }: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
    if (status.accepted) {
      return <Upload {...props} />;
    }
    if (status.rejected) {
      return <X {...props} />;
    }
    return <Photo {...props} />;
  }
  const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
      <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
      <div>
        <Text size="xl" inline>
          Drag images here or click to select files
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          Attach as many files as you like, each file should not exceed 5mb
        </Text>
      </div>
    </Group>
  );

  const onFileSubmit = (files: File[]) => {
    console.log(files);
    setFile(files[0]);
  };

   const onFormSubmit = async (values: { username: string }) => {
    console.log(values);
    if (!file) {
        alert('Please upload a file');
        return;
    }
    if (!values) {
        alert('Please enter a username');
    }
    if (!values.username) {
        alert('Please enter a username');
    }
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('username', values.username);
    formData.forEach((object) => {
      console.log(object);
    });
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
  const theme = useMantineTheme();
  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={Form.onSubmit((values: { username: string }) => onFormSubmit(values))}>
        <TextInput label="Username" placeholder="Username" {...Form.getInputProps('username')} />
        <Dropzone
          onDrop={(files) => onFileSubmit(files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={['audio/wav']}
        >
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default FormSong;
