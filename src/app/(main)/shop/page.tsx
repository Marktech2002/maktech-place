import { permanentRedirect } from 'next/navigation';

export default function Shop() {
  permanentRedirect('/articles');
}
