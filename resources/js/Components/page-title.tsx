interface PageTitleProps {
    title?: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return <h2 className="font-semibold text-xl text-gray-800 p-4">{title}</h2>;
};
