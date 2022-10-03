import Footer from './footer/Footer';
import Navbar from './NavBar/NavBar';

export default function Layout({ children }: any) {
  return (
    <div className="layout">
      <Navbar />

      <div className="page-content">{children}</div>

      <Footer />
    </div>
  );
}
