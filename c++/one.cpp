#include <iostream>
#include <vector>
#include <memory>
#include <stdexcept>
#include <type_traits>
#include <optional>

// Advanced template metaprogramming challenge
template <typename T, typename = void>
class SmartContainer {
private:
    std::vector<T> data;
    
public:
    // Intentionally complex insertion with type constraints
    template <typename U>
    void insert(U value) {
        if constexpr (std::is_arithmetic_v<U>) {
            data.push_back(static_cast<T>(value));
        } else {
            static_assert(std::is_same_v<U, T>, "Insertion type must be arithmetic or match container type");
        }
    }
    
    // Constrained retrieval method
    std::optional<T> get(size_t index) const {
        if (index < data.size()) {
            return data[index];
        }
        return std::nullopt;
    }
    
    // Placeholder for future advanced operations
    void advanced_transform() {
        for (auto& val : data) {
            val *= 2;  // Example operation (doubling values)
        }
    }
};

// Base class for a polymorphic type hierarchy
class Shape {
public:
    virtual double get_area() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
private:
    double radius;
    
public:
    explicit Circle(double r) : radius(r) {
        if (r <= 0) {
            throw std::invalid_argument("Radius must be positive");
        }
    }
    
    double get_area() const override {
        return 3.14159 * radius * radius;
    }
};

class Rectangle : public Shape {
private:
    double width;
    double height;
    
public:
    Rectangle(double w, double h) : width(w), height(h) {
        if (w <= 0 || h <= 0) {
            throw std::invalid_argument("Dimensions must be positive");
        }
    }
    
    double get_area() const override {
        return width * height;
    }
};

// Main function demonstrating complex interactions
int main() {
    // Template container with type restrictions
    SmartContainer<int> int_container;
    int_container.insert(10);
    int_container.insert(20);
    
    // Retrieve and print values
    if (auto val = int_container.get(0)) {
        std::cout << "Retrieved: " << *val << std::endl;
    }
    
    int_container.advanced_transform();
    if (auto val = int_container.get(0)) {
        std::cout << "Transformed: " << *val << std::endl;
    }
    
    // Polymorphic shape management
    std::vector<std::unique_ptr<Shape>> shapes;
    
    try {
        shapes.push_back(std::make_unique<Circle>(5.0));
        shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));
    } catch (const std::invalid_argument& e) {
        std::cerr << "Invalid shape: " << e.what() << std::endl;
    }
    
    // Print areas of shapes
    for (const auto& shape : shapes) {
        std::cout << "Shape area: " << shape->get_area() << std::endl;
    }
    
    return 0;
}