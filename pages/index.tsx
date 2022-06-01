// import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import FileUploads from '../components/FileUpload';

export default function HomePage() {
  return (
    <>
      <FileUploads />
      <ColorSchemeToggle />
    </>
  );
}
