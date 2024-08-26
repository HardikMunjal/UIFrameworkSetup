"use client";
import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from 'react-cookie'
import { useRouter } from "next/navigation";
import TabOne from './grid/user/page';
import TabTwo from './grid/workspace/page';
import TabThree from './grid/object/page';
import styles from './styles/Home.module.css';
export default function HomePage() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  //const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let status;
  if (Object.keys(cookies).length) {
    status = 'authenticated';
  } else {
    status = 'unauthenticated';
  }


  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tab2');

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    router.push('/login'); // Redirect to login page or any other page
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <TabOne />;
      case 'tab2':
        return <TabTwo />;
      case 'tab3':
        return <TabThree />;
      default:
        return <TabOne />;
    }
  };


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButtonDisabled} ${activeTab === 'tab1' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tab1')}
          >
            USER MANAGEMENT
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'tab2' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tab2')}
          >
            WORKSPACE MANAGEMENT
          </button>
          <button
            className={`${styles.tabButtonDisabled} ${activeTab === 'tab3' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tab3')}
          >
            OBJECT MANAGEMENT
          </button>
        </div>
        <div className={styles.tabContent}>
          {renderTabContent()}
        </div>
        <div>
          {/* <p>You are logged in as {session.user.name}</p> */}
        </div>
      </div>

    );
  }

  // This fallback is in case the useEffect has not yet redirected the user
  return null;
}
