export default interface UserProps {
    user: {
        name: string,
        logo: string
    };
    setUser: (name, logo) => void;
}