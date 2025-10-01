'use client';

import TopBar from '../TopBar';
import MenuBar from './MenuBar';
import MobileMenu from './MobileMenu';
import { Section } from '../types';

type Props = {
  currentTime: Date | null;
  mounted: boolean;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  showMenu: string | null;
  setShowMenu: (menu: string | null) => void;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  terminalCollapsed: boolean;
  setTerminalCollapsed: (collapsed: boolean) => void;
  setTerminalHeight: (height: number) => void;
  setTerminalTab: (tab: 'terminal' | 'problems' | 'output') => void;
  setTerminalHistory: (history: string[] | ((prev: string[]) => string[])) => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  handleViewResume: () => void;
  handleCopyEmail: () => void;
  handleCopyPhone: () => void;
};

export default function Header(props: Props) {
  return (
    <>
      <TopBar
        currentTime={props.currentTime}
        mounted={props.mounted}
        showMobileMenu={props.showMobileMenu}
        setShowMobileMenu={props.setShowMobileMenu}
      />
      <MobileMenu
        showMobileMenu={props.showMobileMenu}
        activeSection={props.activeSection}
        setActiveSection={props.setActiveSection}
        setShowMobileMenu={props.setShowMobileMenu}
        currentTheme={props.currentTheme}
        setCurrentTheme={props.setCurrentTheme}
      />
      <MenuBar
        showMenu={props.showMenu}
        setShowMenu={props.setShowMenu}
        activeSection={props.activeSection}
        setActiveSection={props.setActiveSection}
        terminalCollapsed={props.terminalCollapsed}
        setTerminalCollapsed={props.setTerminalCollapsed}
        setTerminalHeight={props.setTerminalHeight}
        setTerminalTab={props.setTerminalTab}
        setTerminalHistory={props.setTerminalHistory}
        currentTheme={props.currentTheme}
        setCurrentTheme={props.setCurrentTheme}
        handleViewResume={props.handleViewResume}
        handleCopyEmail={props.handleCopyEmail}
        handleCopyPhone={props.handleCopyPhone}
      />
    </>
  );
}

