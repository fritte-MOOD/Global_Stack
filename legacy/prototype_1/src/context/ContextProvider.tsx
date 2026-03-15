import { NameProvider } from "./ContextFiles/NameContext";
import { GroupProvider } from "./ContextFiles/GroupContext";
import { ChatProvider } from "./ContextFiles/ChatContext";
import { CheckboxProvider } from "./ContextFiles/CheckboxesContext";
import { MockupProvider } from "./ContextFiles/MockupContext";
import { DebateProvider } from "./ContextFiles/DebateContext";
import { DarkModeProvider } from "./ContextFiles/DarkModeContext";





export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
        <NameProvider>
          <GroupProvider>
            <ChatProvider>
              <MockupProvider>
                <CheckboxProvider>
                  <DebateProvider>
                      <DarkModeProvider>
                    {children}
                      </DarkModeProvider>
                  </DebateProvider>
                </CheckboxProvider>
              </MockupProvider>
            </ChatProvider>
          </GroupProvider>
        </NameProvider>
  );
};


