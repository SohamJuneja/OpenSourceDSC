#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 1000
#define MAX_NAME_LENGTH 50
#define GRADE_CHUNK_SIZE 5  // Allocate memory in chunks

// Custom data structure for student records
typedef struct {
    char name[MAX_NAME_LENGTH];
    int age;
    float* grades;
    int grade_count;
    int grade_capacity;
} Student;

// Global array to store student records
Student* student_database[MAX_STUDENTS];
int total_students = 0;

// Function prototypes
Student* create_student(const char* name, int age);
int add_grade(Student* student, float grade);
void print_student_details(const Student* student);
void optimize_memory_usage();

int main() {
    // Sample initialization
    Student* s1 = create_student("Alice", 20);
    if (s1) {
        add_grade(s1, 85.5);
        add_grade(s1, 90.0);
        add_grade(s1, 87.5);
        print_student_details(s1);
    }
    
    // Free allocated memory before exiting
    optimize_memory_usage();
    return 0;
}

Student* create_student(const char* name, int age) {
    Student* new_student = malloc(sizeof(Student));
    if (!new_student) {
        printf("Memory allocation failed for student\n");
        return NULL;
    }

    // Safe string copy
    strncpy(new_student->name, name, MAX_NAME_LENGTH - 1);
    new_student->name[MAX_NAME_LENGTH - 1] = '\0';
    
    new_student->age = age;
    new_student->grades = NULL;
    new_student->grade_count = 0;
    new_student->grade_capacity = 0;
    
    // Add to global database
    if (total_students < MAX_STUDENTS) {
        student_database[total_students++] = new_student;
    } else {
        printf("Student database is full\n");
        free(new_student);
        return NULL;
    }
    return new_student;
}

int add_grade(Student* student, float grade) {
    if (!student) return 0;
    
    // Expand grades array in chunks
    if (student->grade_count == student->grade_capacity) {
        int new_capacity = student->grade_capacity + GRADE_CHUNK_SIZE;
        float* temp = realloc(student->grades, new_capacity * sizeof(float));
        if (!temp) {
            printf("Memory allocation failed for grades\n");
            return 0;
        }
        student->grades = temp;
        student->grade_capacity = new_capacity;
    }
    
    student->grades[student->grade_count++] = grade;
    return 1;
}

void print_student_details(const Student* student) {
    if (!student) return;
    printf("Name: %s\n", student->name);
    printf("Age: %d\n", student->age);
    printf("Grades: ");
    for (int i = 0; i < student->grade_count; i++) {
        printf("%.2f ", student->grades[i]);
    }
    printf("\n");
}

void optimize_memory_usage() {
    for (int i = 0; i < total_students; i++) {
        free(student_database[i]->grades);
        free(student_database[i]);
    }
    total_students = 0;
}
