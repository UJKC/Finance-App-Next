import PageHeader from "@/components/page-header";

export default function Layout({children}) {
    return(
        <>
            <PageHeader />
            <main>{children}</main>
            <footer>Footer</footer>
        </>
    )
}