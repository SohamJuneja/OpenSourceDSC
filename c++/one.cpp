#include <iostream>
#include <vector>
#include <memory>
#include <stdexcept>
#include <type_traits>
#include <optional>
#include <algorithm>
#include <functional>

// Advanced template metaprogramming challenge
template <typename T, typename = void>
class SmartContainer {
private:
    std::vector<T> data;
    
public:
    // Intentionally complex insertion with type constraints
    template <typename U = T, 
              typename = std::enable_if_t<std::is_arithmetic_v<U>>>
    void insert(U value) {
        data.push_back(static_cast<T>(value));
    }
    
    // Constrained retrieval method
    std::optional<T> get(size_t index) const {
        if (index < data.size()) {
            return data[index];
        }
        return std::nullopt;
    }
    
    // Flexible transformation method
    template <typename Func, typename = std::enable_if_t<std::is_invocable_r_v<T, Func, T>>>
    void advanced_transform(Func func) {
        std::transform(data.begin(), data.end(), data.begin(), func);
    }

    // Type-safe filtering method
    template <typename Predicate, typename = std::enable_if_t<std::is_invocable_r_v<bool, Predicate, T>>>
    SmartContainer filter(Predicate pred) const {
        SmartContainer result;
        std::copy_if(data.begin(), data.end(), std::back_inserter(result.data), pred);
        return result;
    }

    // Print method for demonstration
    void print() const {
        for (const auto& item : data) {
            std::cout << item << " ";
        }
        std::cout << std::endl;
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
    int_container.insert(30);
    
    // Apply a transformation: multiply each element by 2
    int_container.advanced_transform([](int x) { return x * 2; });
    int_container.print(); // Output: 20 40 60
    
    // Filter elements greater than 25
    auto filtered_container = int_container.filter([](int x) { return x > 25; });
    filtered_container.print(); // Output: 40 60
    
    // Polymorphic shape management
    std::vector<std::unique_ptr<Shape>> shapes;
    
    try {
        shapes.push_back(std::make_unique<Circle>(5.0));
        shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));
    } catch (const std::invalid_argument& e) {
        std::cerr << "Invalid shape: " << e.what() << std::endl;
    }
    
    return 0;
}