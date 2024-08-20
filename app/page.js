// app/page.js

"use client";

import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import TabOne from './grid/object/page';
import TabTwo from './grid/object/page';
import TabThree from './grid/object/page';
import styles from './styles/Home.module.css';
export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tab1');

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
        <h1 className={styles.heading}>Home Page with Tabs</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'tab1' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tab1')}
          >
            Tab 1
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'tab2' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tab2')}
          >
            Tab 2
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'tab3' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tab3')}
          >
            Tab 3
          </button>
        </div>
        <div className={styles.tabContent}>
          {renderTabContent()}
        </div>
        <div>
          <h1>Welcome to the Home Page!</h1>
          <p>You are logged in as {session.user.name}</p>
        </div>
      </div>

    );
  }

  // This fallback is in case the useEffect has not yet redirected the user
  return null;
}
