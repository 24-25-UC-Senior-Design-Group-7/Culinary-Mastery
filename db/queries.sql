-- This SQL script creates the necessary tables for the database.

CREATE TABLE Users (
    user_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Courses (
    course_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Analytics (
    analytics_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    course_id UNIQUEIDENTIFIER NOT NULL,
    activity_type VARCHAR(20) CHECK (activity_type IN ('Video Watched', 'Course Completed')),
    timestamp DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE User_Courses (
    user_course_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    course_id UNIQUEIDENTIFIER NOT NULL,
    enrolled_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Videos (
    video_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    course_id UNIQUEIDENTIFIER NOT NULL,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    uploaded_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Transcripts (
    transcript_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    video_id UNIQUEIDENTIFIER NOT NULL,
    content TEXT NOT NULL,
    generated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (video_id) REFERENCES Videos(video_id)
);
