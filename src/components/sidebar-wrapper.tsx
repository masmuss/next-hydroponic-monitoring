type SidebarWrapperProps = {
    children: React.ReactNode;
}

export default function SidebarWrapper(props: SidebarWrapperProps) {
    const {children} = props;

    return (
        <div className={'bg-zinc-50 flex flex-col border-r p-4 min-h-screen sticky top-0 w-96'}>
            {children}
        </div>
    )
}