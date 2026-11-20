import type { Metadata } from "next";
import Link from "next/link";
import { ArtFrame } from "@/components/art-views";
import { ReaderHead } from "@/components/reader-shell";

export const metadata: Metadata = { title: "ไม่พบหน้านี้", robots: { index: false } };

// An old post link or a mistyped URL lands here inside the site frame, with the top bar and clear ways back.
export default function NotFound() {
  return (
    <ArtFrame current="home">
      <ReaderHead title="ไม่พบหน้านี้" lede="ลิงก์อาจเก่าหรือพิมพ์ผิด ลองเริ่มจากหน้าแรกหรือรายการบทความทั้งหมด">
        <Link className="rs-button" href="/posts/">ดูบทความทั้งหมด</Link>
        <Link className="rs-plain" href="/">กลับหน้าแรก</Link>
      </ReaderHead>
    </ArtFrame>
  );
}
