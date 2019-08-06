export default interface FirstLoadingProps {
    loggedInUser: boolean;
    firstLoadingDone: () => void;
    firstLoadingCancel: () => void;
}