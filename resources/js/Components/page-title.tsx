interface PageTitleProps {
    title?: string;
    children?: React.ReactNode;
    center?: React.ReactNode;
}

export const PageTitle = ({ title, children, center }: PageTitleProps) => {
    return (
        <div className="flex justify-between p-4">
            <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
            <div className="font-semibold text-xl text-gray-800">{center}</div>
            <div>{children}</div>
        </div>
    );
};
