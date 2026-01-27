

1. convertion user requirement to product, adjustment feature
2. target minimum evaluasi product 100 orang, deploy prod

saya ingin membuat skripsi tentang nirmana bebasis paku, aplikasi berbasis web untuk membantu mahasiswa jurusan DKV (Desain Komunikasi Visual).

saya menyediakan 2D dan 3D di website, saya ingin membuat penggalian informasi kepada calon user untuk mengetahui kebutuhan dan harapan mereka terhadap aplikasi ini.

saya juga ingin melakukan evaluasi produk dengan melibatkan minimal 100 orang pengguna untuk mendapatkan masukan dan saran perbaikan sebelum melakukan deployment ke produksi.


Apakah Anda merasa aplikasi ini perlu menyediakan opsi penyimpanan cloud untuk menyimpan pekerjaan desain Anda?

A. Sangat penting

B. Cukup penting

C. Tidak terlalu penting

D. Tidak penting sama sekali















[
  {
    responden_1: [
      {
        "question": "Apakah Anda mahasiswa Jurusan Desain Komunikasi Visual (DKV)?",
        "answer": "Ya"
      },
    ]
    responden_2: [
      {
        "question": "Apakah Anda mahasiswa Jurusan Desain Komunikasi Visual (DKV)?",
        "answer": "Ya"
      },
    ]
  }
]


3.1 Metodologi
3.2 Analisis
3.2.1 Analisis Permasalahan dan Kebutuhan
3.2.1.1 Kuesioner
3.2.1.2 Wawancara
3.2.2 Kesimpulan Analisis Kebutuhan dan Masalah
3.2.3 Solusi Permasalahan
3.3 Perancangan
3.3.1 Perancangan Sistem
3.3.1.1 Diagram Use Case dan Narrative
3.3.1.1.1 Register
3.3.1.1.1 Login
3.3.1.1.2 Logout
3.3.1.1.3 New Design
3.3.1.1.4 Share
3.3.1.1.5 etc

etc
3.3.1.2 Diagram Class dan Activity
3.3.1.2.1 Register
3.3.1.2.2 Login
3.3.1.2.3 Logout
3.3.1.2.4 etc
etc

3.3.1.3 Sequence Diagram
3.3.1.3.1 Sequence Diagram Login
3.3.1.3.2 Sequence Diagram Logout
3.3.1.3.x ...


Use Case Diagram
This diagram outlines the interactions between users and the system. Below is the swimlanes.io script for the use case diagram:

@startuml
|User|
:Login;
:Save Work;
:Share Link;

|System|
:Validate Login;
:Save Design;
:Generate Shareable Link;
:Manage Public Access;

|Admin|
:Set Public Access;
@enduml

Use Case Narrative

Login

Actor: User

Description: Users will enter their credentials to access the application.

Pre-condition: The user must be registered in the system.

Flow:

User enters username and password.

System verifies credentials.

System grants access to the main page if the credentials are correct.

Post-condition: User is logged in and can interact with the system.

Save Work

Actor: User

Description: Users will save their design work.

Pre-condition: User must be logged in.

Flow:

User completes design in 3D simulation.

User clicks "Save Work".

System saves the design data.

Post-condition: User's design is saved in the system.

Share Link

Actor: User

Description: Users can share their saved designs by generating a link.

Pre-condition: User must have saved a design.

Flow:

User clicks "Generate Link".

System generates a shareable link.

Post-condition: User can share the generated link with others.

Manage Public Access

Actor: Admin

Description: Admin can set public access to the saved designs, allowing others to view them.

Pre-condition: Admin must be logged in.

Flow:

Admin selects a design.

Admin toggles the public access setting.

System updates the design's public access status.

Post-condition: The design is either public or private based on admin's choice.

Diagram Kelas dan Aktivitas
Class Diagram
Below is a simplified Class Diagram in textual format:

plaintext
Copy
Edit
+---------------------+       +---------------------+
|    User             |       |     Design          |
+---------------------+       +---------------------+
| - userID: int       |       | - designID: int     |
| - username: string  |       | - designData: string|
| - password: string  |       | - userID: int       |
| - email: string     |       | - publicAccess: bool|
+---------------------+       +---------------------+
       |                               |
       | 1                             | 1
       |                               |
       v                               v
+---------------------+       +---------------------+
|    Admin            |       |     ShareLink       |
+---------------------+       +---------------------+
| - adminID: int      |       | - linkID: int       |
| - username: string  |       | - url: string       |
| - password: string  |       | - designID: int     |
+---------------------+       +---------------------+
Activity Diagram
This diagram describes the flow of the "Save Work" feature:


@startuml
|User|
start
:Create Design;
:Click Save;
|System|
:Save Design Data;
:Confirm Save;
|User|
stop
@enduml

3.3.2 Rancangan Layar
Schema Database
To ensure the application's data is stored and accessed efficiently, here is the Database Schema for your web application. The database will manage users, designs, and shared links.

sql
Copy
Edit
CREATE TABLE users (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE designs (
    designID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    designData TEXT NOT NULL,
    publicAccess BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE shareLinks (
    linkID INT PRIMARY KEY AUTO_INCREMENT,
    designID INT,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (designID) REFERENCES designs(designID)
);
Explanation:

users: Stores user details like username, password, and role.

designs: Stores the design data and whether it is publicly accessible.

shareLinks: Stores the generated link for each design, which users can share.

This completes the perancangan sistem section of your thesis. Let me know if you need further refinement or additional sections! 





eval "$(ssh-agent -s)"
ssh-add ~/.ssh/havus

git push origin thesis
