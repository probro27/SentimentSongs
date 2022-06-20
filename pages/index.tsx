// import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
// import FileUploads from '../components/FileUpload/FileUpload';
import FormSong from '../components/FormSong/FormSong';

export default function HomePage() {
  return (
    <>
      <FormSong />
      <ColorSchemeToggle />
    </>
  );
}
