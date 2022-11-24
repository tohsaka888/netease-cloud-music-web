import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const StateContext = createContext<boolean>(false);
const DispatchContext = createContext<Dispatch<SetStateAction<boolean>>>(null!);

type Props = {
  children: React.ReactNode;
};

function LoginModalVisibleProvider({ children }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <StateContext.Provider value={visible}>
      <DispatchContext.Provider value={setVisible}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export const useModalVisible = () => {
  const visible = useContext(StateContext)!;
  return visible;
};

export const useDispatchModalVisible = () => {
  const setVisible = useContext(DispatchContext)!;
  return setVisible;
};

export default LoginModalVisibleProvider;
