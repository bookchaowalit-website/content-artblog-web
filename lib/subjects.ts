// The eight subject pages (/arts/<id>): a one-line Thai definition, an English scope line and a Markdown body.
// Moved out of app/arts/[category]/page.tsx so the views and tests can read them.

export type Subject = { id: string; title: string; definition: string; description: string; coverImage: string; content: string }

export const SUBJECTS: Subject[] = [
  {
    id: 'illustration',
    title: 'Illustration',
    definition: 'การสร้างภาพเพื่อสื่อความหมายหรือเสริมเนื้อหา ใช้ในหนังสือ บทความ โฆษณา และงาน concept art',
    description: 'Digital and traditional drawing techniques, character design, and visual storytelling',
    coverImage: '/images/covers/illustration-cover.jpg',
    content: `
# Illustration คืออะไร

Illustration คือการสร้างภาพเพื่อสื่อความหมายหรือเสริมเนื้อหา — ใช้ได้ในหนังสือ, บทความ, โฆษณา, เกม และงาน concept art เป็นต้น.

## ประเภทของ Illustration

### Editorial Illustration
เน้นเล่าเรื่องสั้นๆ เสริมบทความข่าว วารสาร และนิตยสาร

### Children's Book Illustration
รูปภาพน่ารัก สีสดใส เหมาะสำหรับหนังสือเด็ก

### Concept Art
สำหรับเกม ภาพยนตร์ และงานออกแบบตัวละคร

### Vector Illustration
ใช้ในงานกราฟิกดิจิทัลและการพิมพ์

## เทคนิคสำคัญ

### Composition
การจัดองค์ประกอบภาพให้สมดุลและน่าสนใจ

### Color Theory
การเลือกสีให้สื่ออารมณ์และความหมาย

### Line Work
เทคนิคการใช้เส้นและการแสดงค่าโทน

### Storytelling
การเล่าเรื่องผ่านภาพ

## เครื่องมือแนะนำ

- **Procreate** — แท็บเล็ตและแอปวาดภาพดิจิทัล
- **Adobe Photoshop** — เครื่องมือแก้ไขภาพขั้นสูง
- **Adobe Illustrator** — สำหรับงาน vector
- **Clip Studio Paint** — เฉพาะสำหรับการวาดและการ์ตูน

## กระบวนการทำงาน

1. **Sketch** — ร่างภาพคร่าวๆ
2. **Refine** — ปรับปรุงรายละเอียด
3. **Color** — เพิ่มสีและโทน
4. **Polish** — เสริมรายละเอียดสุดท้าย

## การตลาดและขายงาน

- **Stock Illustration** — ขายภาพสต็อก
- **Client Work** — รับจ้างจากลูกค้า
- **Publishing** — ทำงานกับสำนักพิมพ์
- **Freelance** — ทำงานอิสระ
    `
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    definition: 'การใช้ภาพ ข้อความ และองค์ประกอบภาพเพื่อสื่อสารข้อความหรือสร้างความประทับใจ',
    description: 'Visual communication, branding, print and digital design',
    coverImage: '/images/covers/graphic-design-cover.jpg',
    content: `
# Graphic Design คืออะไร

Graphic Design คือการใช้ภาพ ข้อความ และองค์ประกอบภาพเพื่อสื่อสารข้อความหรือสร้างความประทับใจ.

## สาขาย่อยของ Graphic Design

### Branding & Identity
การออกแบบตัวตนแบรนด์ ตราสินค้า และเอกลักษณ์องค์กร

### Print Design
การออกแบบสำหรับสิ่งพิมพ์ เช่น โปสเตอร์ แผ่นพับ และบรรจุภัณฑ์

### Digital Design
การออกแบบสำหรับสื่อดิจิทัล เว็บไซต์ และโซเชียลมีเดีย

### Motion Graphics
การออกแบบภาพเคลื่อนไหวและวิดีโอ

## หลักการออกแบบ

### Hierarchy
การจัดลำดับความสำคัญของข้อมูล

### Balance
ความสมดุลขององค์ประกอบภาพ

### Contrast
ความแตกต่างเพื่อดึงดูดสายตา

### Alignment
การจัดตำแหน่งที่สม่ำเสมอ

## เครื่องมือหลัก

- **Adobe Creative Suite** — Photoshop, Illustrator, InDesign
- **Figma** — เครื่องมือออกแบบ UI/UX
- **Sketch** — สำหรับ macOS
- **Canva** — เครื่องมือออนไลน์สำหรับผู้เริ่มต้น

## กระบวนการออกแบบ

1. **Research** — ศึกษาข้อมูลและกลุ่มเป้าหมาย
2. **Brainstorm** — สร้างไอเดียและแนวคิด
3. **Design** — ออกแบบและสร้าง
4. **Feedback** — รับคำติชมและปรับปรุง
5. **Final** — เสร็จสิ้นและส่งมอบ

## การทำงานในอุตสาหกรรม

- **Agency** — ทำงานในบริษัทโฆษณา
- **In-house** — ทำงานในองค์กร
- **Freelance** — ทำงานอิสระ
- **Consulting** — ให้คำปรึกษาด้านการออกแบบ
    `
  },
  {
    id: 'photography',
    title: 'Photography',
    definition: 'ศิลปะและเทคนิคการบันทึกภาพด้วยแสง ใช้กล้องหรืออุปกรณ์อื่นๆ',
    description: 'Camera techniques, composition, lighting, and post-processing',
    coverImage: '/images/covers/photography-cover.jpg',
    content: `
# Photography คืออะไร

Photography คือศิลปะและเทคนิคการบันทึกภาพด้วยแสง ใช้กล้องหรืออุปกรณ์อื่นๆ.

## องค์ประกอบสำคัญ

### Light
แสงเป็นหัวใจสำคัญของภาพถ่าย

### Composition
การจัดองค์ประกอบภาพ

### Subject
วัตถุหลักในภาพ

### Emotion
ความรู้สึกที่ภาพสื่อ

## การตั้งค่ากล้อง

### Aperture (f-stop)
ควบคุมความลึกของภาพและปริมาณแสง

### Shutter Speed
ควบคุมความเร็วชัตเตอร์และการเคลื่อนไหว

### ISO
ความไวแสงของเซ็นเซอร์

### White Balance
การปรับสมดุลสีของภาพ

## สไตล์การถ่ายภาพ

### Portrait
การถ่ายภาพบุคคล

### Landscape
การถ่ายภาพทิวทัศน์

### Street Photography
การถ่ายภาพชีวิตประจำวัน

### Macro
การถ่ายภาพวัตถุขนาดเล็ก

## เทคนิคการถ่าย

- **Rule of Thirds** — กฎการแบ่งภาพเป็น 3 ส่วน
- **Leading Lines** — เส้นนำสายตา
- **Golden Ratio** — สัดส่วนทอง
- **Symmetry** — ความสมมาตร

## การแต่งภาพ

### Lightroom
เครื่องมือแก้ไขภาพขั้นสูง

### Photoshop
การแก้ไขภาพแบบละเอียด

### Mobile Apps
แอปแต่งภาพบนมือถือ

## การตลาดภาพถ่าย

- **Stock Photography** — ขายภาพสต็อก
- **Commercial** — รับจ้างถ่ายภาพเชิงพาณิชย์
- **Fine Art** — ขายงานศิลปะ
- **Social Media** — แชร์และสร้างฐานผู้ติดตาม
    `
  },
  {
    id: 'painting',
    title: 'Painting',
    definition: 'การใช้สีและแปรงเพื่อสร้างภาพบนผ้าใบหรือพื้นผิวอื่นๆ',
    description: 'Oil, acrylic, watercolor techniques, and art history',
    coverImage: '/images/covers/painting-cover.jpg',
    content: `
# Painting คืออะไร

Painting คือการใช้สีและแปรงเพื่อสร้างภาพบนผ้าใบหรือพื้นผิวอื่นๆ เป็นศิลปะที่เก่าแก่และหลากหลายรูปแบบ.

## ประเภทของสีและเทคนิค

### Oil Painting
การใช้สีน้ำมัน ทนทานและมีเวลาแห้งนาน

### Acrylic Painting
สีอะคริลิก แห้งเร็วและใช้งานง่าย

### Watercolor
สีน้ำ สร้างเอฟเฟกต์โปร่งใสและละเอียด

### Gouache
สีกัวซ์ สีทึบและใช้งานได้หลากหลาย

## หลักการพื้นฐาน

### Color Theory
ทฤษฎีสีและการผสมสี

### Value
ค่าความสว่างและความมืด

### Composition
การจัดองค์ประกอบภาพ

### Brushwork
เทคนิคการใช้แปรง

## ประวัติศาสตร์การวาดภาพ

### Renaissance
ยุคฟื้นฟูศิลปะยุโรป

### Impressionism
ลัทธิประทับใจ

### Modern Art
ศิลปะสมัยใหม่

### Contemporary
ศิลปะร่วมสมัย

## เครื่องมือและอุปกรณ์

- **Canvas** — ผ้าใบวาดภาพ
- **Brushes** — แปรงหลากหลายขนาด
- **Paints** — สีและตัวกลาง
- **Easels** — ขาตั้งภาพ

## เทคนิคการวาด

1. **Underpainting** — วาดฐานสี
2. **Blocking in** — วาดโครงร่างใหญ่
3. **Detailing** — เพิ่มรายละเอียด
4. **Glazing** — วาดชั้นสีโปร่ง

## การแสดงและขายงาน

- **Galleries** — แกลเลอรี่ศิลปะ
- **Auctions** — การประมูล
- **Online Sales** — ขายออนไลน์
- **Commissions** — รับจ้างวาดภาพ
    `
  },
  {
    id: 'sculpture',
    title: 'Sculpture',
    definition: 'การสร้างงานศิลปะสามมิติจากวัสดุต่างๆ เช่น ดิน หิน หรือโลหะ',
    description: '3D art forms, materials, and sculpting techniques',
    coverImage: '/images/covers/sculpture-cover.jpg',
    content: `
# Sculpture คืออะไร

Sculpture คือการสร้างงานศิลปะสามมิติจากวัสดุต่างๆ เป็นศิลปะที่เน้นการทำงานกับรูปทรง ปริมาตร และพื้นผิว.

## วัสดุสำหรับปั้น

### Clay
ดินเหนียวสำหรับปั้นรูปทรง

### Stone
หินสำหรับแกะสลัก

### Metal
โลหะหล่อและเชื่อม

### Wood
ไม้แกะสลัก

## เทคนิคการปั้น

### Modeling
การปั้นและ塑รูปดิน

### Carving
การแกะและตัดวัสดุ

### Casting
การหล่อและเทวัสดุ

### Assembling
การประกอบชิ้นส่วน

## ประเภทของประติมากรรม

### Figurative
รูปปั้นที่มีรูปร่างเหมือนจริง

### Abstract
รูปปั้นนามธรรม

### Kinetic
รูปปั้นที่เคลื่อนไหวได้

### Installation
งานประติมากรรมแบบติดตั้ง

## เครื่องมือ

- **Modeling Tools** — เครื่องมือปั้น
- **Carving Tools** — เครื่องมือแกะ
- **Power Tools** — เครื่องมือไฟฟ้า
- **Safety Equipment** — อุปกรณ์ความปลอดภัย

## กระบวนการสร้าง

1. **Planning** — วางแผนและออกแบบ
2. **Preparation** — เตรียมวัสดุ
3. **Creation** — สร้างงาน
4. **Finishing** — เสริมและตกแต่ง

## การแสดงและอนุรักษ์

- **Museums** — พิพิธภัณฑ์
- **Public Art** — ศิลปะสาธารณะ
- **Conservation** — การอนุรักษ์
- **Restoration** — การบูรณะ
    `
  },
  {
    id: 'digital-art',
    title: 'Digital Art',
    definition: 'การสร้างงานศิลปะโดยใช้เครื่องมือดิจิทัลและซอฟต์แวร์',
    description: 'Digital painting, 3D modeling, animation, and software tools',
    coverImage: '/images/covers/digital-art-cover.jpg',
    content: `
# Digital Art คืออะไร

Digital Art คือการสร้างงานศิลปะโดยใช้เครื่องมือดิจิทัลและซอฟต์แวร์ ผสมผสานเทคโนโลยีเข้ากับความคิดสร้างสรรค์.

## สาขาของ Digital Art

### Digital Painting
การวาดภาพดิจิทัล

### 3D Modeling
การสร้างโมเดลสามมิติ

### Animation
การสร้างภาพเคลื่อนไหว

### Motion Graphics
กราฟิกเคลื่อนไหว

## เครื่องมือซอฟต์แวร์

### Painting Software
- Photoshop
- Corel Painter
- Krita

### 3D Software
- Blender
- Maya
- ZBrush

### Animation Software
- After Effects
- Toon Boom
- TVPaint

## อุปกรณ์ฮาร์ดแวร์

### Graphics Tablets
แท็บเล็ตวาดภาพ

### Drawing Monitors
จอภาพวาด

### Stylus Pens
ปากกาสำหรับแท็บเล็ต

### Computers
คอมพิวเตอร์ประสิทธิภาพสูง

## เทคนิคการทำงาน

### Layers
การใช้เลเยอร์ในการทำงาน

### Brushes
แปรงดิจิทัลหลากหลาย

### Effects
เอฟเฟกต์และฟิลเตอร์

### File Formats
รูปแบบไฟล์ต่างๆ

## การเผยแพร่และขาย

- **Online Galleries** — แกลเลอรี่ออนไลน์
- **NFTs** — โทเค็นดิจิทัล
- **Print-on-Demand** — พิมพ์ตามสั่ง
- **Stock Art** — ภาพสต็อกดิจิทัล

## แนวโน้มและอนาคต

- **AI Art** — ศิลปะจากปัญญาประดิษฐ์
- **VR/AR** — ความจริงเสมือน
- **Generative Art** — ศิลปะสร้างสรรค์อัตโนมัติ
- **Interactive Art** — ศิลปะเชิงโต้ตอบ
    `
  },
  {
    id: 'typography',
    title: 'Typography',
    definition: 'ศิลปะและเทคนิคการจัดวางตัวอักษรและการออกแบบตัวอักษร',
    description: 'Font design, layout, and text-based visual communication',
    coverImage: '/images/covers/typography-cover.jpg',
    content: `
# Typography คืออะไร

Typography คือศิลปะและเทคนิคการจัดวางตัวอักษรและการออกแบบตัวอักษร เป็นรากฐานสำคัญของการออกแบบกราฟิก.

## องค์ประกอบของตัวอักษร

### Anatomy
ส่วนประกอบของตัวอักษร

### Classification
การจำแนกประเภทฟอนต์

### Hierarchy
ลำดับความสำคัญของข้อความ

### Spacing
การเว้นวรรคและระยะห่าง

## ประเภทของฟอนต์

### Serif
ฟอนต์ที่มีหัวท้าย

### Sans Serif
ฟอนต์ไม่มีหัวท้าย

### Script
ฟอนต์ลายมือ

### Display
ฟอนต์สำหรับหัวข้อ

## หลักการจัดวาง

### Alignment
การจัดตำแหน่ง

### Leading
ระยะห่างระหว่างบรรทัด

### Kerning
ระยะห่างระหว่างตัวอักษร

### Tracking
ระยะห่างของกลุ่มตัวอักษร

## เครื่องมือ

### Font Software
- FontLab
- Glyphs
- RoboFont

### Design Software
- Illustrator
- InDesign
- Sketch

## การออกแบบฟอนต์

1. **Sketching** — ร่างแบบฟอนต์
2. **Digitizing** — นำเข้าดิจิทัล
3. **Refining** — ปรับปรุงรายละเอียด
4. **Testing** — ทดสอบการใช้งาน

## การประยุกต์ใช้

- **Branding** — ตัวตนแบรนด์
- **Print** — สิ่งพิมพ์
- **Web** — อินเทอร์เน็ต
- **Signage** — ป้ายและสัญญาณ

## แนวโน้ม

- **Variable Fonts** — ฟอนต์ปรับได้
- **Color Fonts** — ฟอนต์สี
- **Icon Fonts** — ฟอนต์ไอคอน
- **Custom Fonts** — ฟอนต์กำหนดเอง
    `
  },
  {
    id: 'animation',
    title: 'Animation',
    definition: 'การสร้างภาพเคลื่อนไหวโดยใช้เทคนิคต่างๆ เช่น 2D, 3D, หรือ stop-motion',
    description: 'Frame-by-frame animation, motion graphics, and storytelling',
    coverImage: '/images/covers/animation-cover.jpg',
    content: `
# Animation คืออะไร

Animation คือการสร้างภาพเคลื่อนไหวโดยใช้เทคนิคต่างๆ เป็นศิลปะที่ผสมผสานเรื่องราว ความคิดสร้างสรรค์ และเทคโนโลยี.

## ประเภทของอนิเมชัน

### 2D Animation
อนิเมชันสองมิติ

### 3D Animation
อนิเมชันสามมิติ

### Stop Motion
อนิเมชันหยุดภาพ

### Motion Graphics
กราฟิกเคลื่อนไหว

## เทคนิคการสร้าง

### Frame by Frame
วาดภาพต่อเฟรม

### Keyframes
เฟรมสำคัญและการอินเทอร์โพลเลท

### Tweening
การสร้างภาพระหว่างคีย์เฟรม

### Rigging
การสร้างโครงร่างสำหรับ 3D

## เครื่องมือซอฟต์แวร์

### 2D Software
- Toon Boom Harmony
- Adobe Animate
- TVPaint

### 3D Software
- Maya
- Blender
- Cinema 4D

### Compositing
- After Effects
- Nuke
- Fusion

## กระบวนการทำงาน

1. **Storyboarding** — วางแผนเรื่องราว
2. **Animatics** — อนิเมติกส์คร่าวๆ
3. **Animation** — สร้างภาพเคลื่อนไหว
4. **Compositing** — ประกอบภาพ
5. **Rendering** — เรนเดอร์ภาพ

## องค์ประกอบสำคัญ

### Timing
จังหวะและความเร็ว

### Spacing
การเว้นระยะ

### Weight
น้ำหนักและแรง

### Anticipation
การเตรียมการ

## การนำไปใช้

- **Film & TV** — ภาพยนตร์และโทรทัศน์
- **Games** — เกมคอมพิวเตอร์
- **Advertising** — โฆษณา
- **Education** — การศึกษา

## แนวโน้มอนาคต

- **Real-time Animation** — อนิเมชันเรียลไทม์
- **AI Animation** — อนิเมชันจาก AI
- **VR Animation** — อนิเมชัน VR
- **Interactive Animation** — อนิเมชันเชิงโต้ตอบ
    `
  }
]

export const subjectById = (id: string) => SUBJECTS.find((subject) => subject.id === id)
