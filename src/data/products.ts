/* ═══════════════════════════════════════════
   AFFILIATE PRODUCT DATA (Phase 1 — Static)
   ═══════════════════════════════════════════ */

export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    accuracy?: string;
    range?: string;
    imageUrl: string;
    affiliateUrl: string;
    badge?: "Editor's Pick";
}

export const products: Product[] = [
    {
        id: "thermapen-one",
        name: "Thermapen ONE",
        description: "Best-in-class instant-read thermometer. 1-second readings.",
        price: "$99.00",
        accuracy: "±0.5°F",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx3tVluJK4_KwCfktjb08CpR1tE9ApDuVLo1R4AUq8RgxCTwf-Cx45YSDbAv-GzwS3-D4CFJkO8opZMcfj7Ik3n3vNfBBKMS3osgdYyb4CniFfp9NrxpYUrdfpquBcjEjBPMhj3AYy-UoOpnfX5fCgrOs4NM3IE-opWcgOslX7LQZ1mFTGLncW3meWmthzJst05xGtk7Y8c3Wb3vIC-vsk9ZDvJypSy2r3Wi-pyVYpFVoZbo6gpimn6PpPv3dDrDoFafVru9IKmqn7",
        affiliateUrl: "#",
        badge: "Editor's Pick",
    },
    {
        id: "ir-gun",
        name: "Industrial IR Gun",
        description: "Non-contact infrared thermometer for surface temperatures.",
        price: "$45.00",
        range: "-58°F to 1022°F",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj-FgnAlUTQzXfFgMXAD4Kcf-RdcklYlQcKsZIppETiGyNzZl2IDp3XQx7wxB4Vq7BmOJabsy4Ub5MUNU8blheCKWtHlrJzBCjQVcYNqBbfZgsQFKYZ5K2JYJ3mO81Vy2KCYR70xA-qVEoWAhtA7dMMdsQwfQW3v8pwMtif1adbW9Doae_0Xiwhoio76vK4R8u28DTpcPrgoD3XVZIEOyWTtZj5R20ZAxjE4PDGELPlQctAQj1A_u1RQXLSW1hCSpQhDnAXUxw0i2s",
        affiliateUrl: "#",
    },
    {
        id: "meater-plus",
        name: "MEATER Plus",
        description: "Wireless smart meat thermometer with Bluetooth range of 165 ft.",
        price: "$79.95",
        accuracy: "±1.0°F",
        imageUrl: "/images/meater-plus.webp",
        affiliateUrl: "#",
    },
    {
        id: "thermoworks-smoke",
        name: "ThermoWorks Smoke",
        description: "Dual-channel alarm thermometer for grills and smokers.",
        price: "$99.00",
        range: "-58°F to 572°F",
        imageUrl: "/images/thermoworks-smoke.webp",
        affiliateUrl: "#",
    },
];
