import {permanentRedirect} from "next/navigation";

export default function Home() {
    permanentRedirect('/dashboard');
    // return (
    //     <main className={'p-20'}>
    //         <div className={'flex flex-wrap w-full h-full justify-center items-center'}>
    //             select a device to view its data
    //         </div>
    //     </main>
    // );
}
