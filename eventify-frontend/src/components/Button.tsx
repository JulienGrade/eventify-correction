type Props = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function Button({ children, onClick }: Readonly<Props>) {

    return (

        <button
            onClick={onClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition font-medium"
        >
            {children}
        </button>

    );

}