module.exports = {
  apps: [{
    name: "nativebackend_ecosystem",  // ชื่อแอปพลิเคชัน
    script: "./bin/www",  // ตรงไปที่ไฟล์หลัก
    interpreter: "node",  // ใช้ node โดยตรง
    instances: "max",     // ใช้ทุก CPU core
    autorestart: true,
    watch: false,         // ปิด watch ใน production
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production"
    }
  }]
}