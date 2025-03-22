import React, { ReactNode } from "react";
import { Footer, Header } from "../common";

interface Props {
  children: ReactNode;
}

/**
 * MainLayout component provides a consistent layout structure for the application.
 *
 * It wraps the provided children with a header and footer, ensuring a uniform
 * look and feel across different pages.
 *
 * @param children - The React nodes to render within the main content area.
 * @returns JSX.Element
 */

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;

/**
 * Usage example:
 *
 * import MainLayout from './MainLayout';
 *
 * function MyPage() {
 * return (
 * <MainLayout>
 * <div>My page content</div>
 * </MainLayout>
 * );
 * }
 */
