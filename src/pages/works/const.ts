import { CertDicodingC } from "../../assets/images";

export interface WorkItem {
    title: string;
    file: string;
    image: string;
    desc: string;
    cta: string;
    href: string;
}

export const WORKS: WorkItem[] = [
    {
        title: "Memulai Pemrograman dengan C",
        file: "Pemrograman-dengan-C.png",
        image: CertDicodingC,
        desc: "Sertifikat kelulusan kelas Memulai Pemrograman dengan C.",
        cta: "Lihat Sertifikat",
        href: 'https://www.dicoding.com/certificates/6RPN7DK29X2M'
    }
];
