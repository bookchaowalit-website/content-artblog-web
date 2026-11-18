import type { Metadata } from "next";
import Link from "next/link";
import { ArtFrame } from "@/components/art-views";
import { Prose, ReaderHead } from "@/components/reader-shell";

export const metadata: Metadata = { title: "เกี่ยวกับ", description: "Creative Arts Knowledge คืออะไร เขียนให้ใคร และติดต่อได้ทางไหน", alternates: { canonical: "/about/" } };

export default function AboutPage() {
  return (
    <ArtFrame current="about">
      <ReaderHead title="เกี่ยวกับ Creative Arts Knowledge" lede="สมุดโน้ตรวบรวมความรู้เรื่องศิลปะและงานสร้างสรรค์" />
      <Prose>
        <h2>จุดประสงค์</h2>
        <p>รวบรวมความรู้พื้นฐานเรื่องศิลปะและงานสร้างสรรค์ไว้ในที่เดียว ให้ทั้งผู้เริ่มต้นและผู้ที่มีประสบการณ์หยิบไปใช้ได้</p>
        <h2>สิ่งที่มีในเว็บนี้</h2>
        <ul>
          <li><strong>คำจำกัดความ</strong>: อธิบายแต่ละสาขาศิลปะ (<Link href="/categories/">สาขาศิลปะ</Link>)</li>
          <li><strong>เทคนิคและวิธีการ</strong>: แนวทางที่นำไปลองทำได้ (<Link href="/posts/">บทความ</Link>)</li>
          <li><strong>เครื่องมือแนะนำ</strong>: ซอฟต์แวร์และอุปกรณ์ที่ใช้ในแต่ละสาขา</li>
        </ul>
        <h2>สำหรับใคร</h2>
        <ul>
          <li>นักเรียนและนักศึกษา</li>
          <li>มืออาชีพที่อยากทบทวนพื้นฐาน</li>
          <li>คนที่กำลังมองหาเส้นทางในงานศิลปะ</li>
          <li>คนที่ชอบศิลปะและอยากเรียนรู้เพิ่ม</li>
        </ul>
        <h2>ติดต่อ</h2>
        <p>มีคำแนะนำหรือพบข้อผิดพลาด ติดต่อผ่าน <a href="https://bookchaowalit.com/">bookchaowalit.com</a> หรือเปิด issue ที่ <a href="https://github.com/bookchaowalit-website/content-artblog-web/issues">รีโพของเว็บนี้</a></p>
      </Prose>
    </ArtFrame>
  );
}
