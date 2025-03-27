#include <iostream>
#include <vector>
#include <memory>
#include <stdexcept>
#include <optional>
#include <cmath>

// Base class for shape calculations
class Shape {
public:
    virtual double get_area() const = 0;
    virtual double get_perimeter() const = 0;
    virtual std::pair<double, double> get_centroid() const = 0;
    virtual double get_moment_of_inertia() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
private:
    double radius;

public:
    explicit Circle(double r) : radius(r) {
        if (r <= 0) throw std::invalid_argument("Radius must be positive");
    }

    double get_area() const override {
        return M_PI * radius * radius;
    }

    double get_perimeter() const override {
        return 2 * M_PI * radius;
    }

    std::pair<double, double> get_centroid() const override {
        return {0.0, 0.0};
    }

    double get_moment_of_inertia() const override {
        return (M_PI * radius * radius * radius * radius) / 4.0;
    }
};

class Rectangle : public Shape {
private:
    double width, height;

public:
    Rectangle(double w, double h) : width(w), height(h) {
        if (w <= 0 || h <= 0) throw std::invalid_argument("Dimensions must be positive");
    }

    double get_area() const override {
        return width * height;
    }

    double get_perimeter() const override {
        return 2 * (width + height);
    }

    std::pair<double, double> get_centroid() const override {
        return {width / 2.0, height / 2.0};
    }

    double get_moment_of_inertia() const override {
        return (width * height * height * height) / 12.0;
    }
};

class Triangle : public Shape {
private:
    double base, height;

public:
    Triangle(double b, double h) : base(b), height(h) {
        if (b <= 0 || h <= 0) throw std::invalid_argument("Base and height must be positive");
    }

    double get_area() const override {
        return 0.5 * base * height;
    }

    double get_perimeter() const override {
        return base + 2 * sqrt((height * height) + (base / 2) * (base / 2));
    }

    std::pair<double, double> get_centroid() const override {
        return {base / 3.0, height / 3.0};
    }

    double get_moment_of_inertia() const override {
        return (base * height * height * height) / 36.0;
    }
};

class Ellipse : public Shape {
private:
    double major_axis, minor_axis;

public:
    Ellipse(double a, double b) : major_axis(a), minor_axis(b) {
        if (a <= 0 || b <= 0) throw std::invalid_argument("Axes must be positive");
    }

    double get_area() const override {
        return M_PI * major_axis * minor_axis;
    }

    double get_perimeter() const override {
        return M_PI * (3 * (major_axis + minor_axis) - sqrt((3 * major_axis + minor_axis) * (major_axis + 3 * minor_axis)));
    }

    std::pair<double, double> get_centroid() const override {
        return {0.0, 0.0};
    }

    double get_moment_of_inertia() const override {
        return (M_PI * major_axis * minor_axis * minor_axis * minor_axis) / 4.0;
    }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    try {
        shapes.push_back(std::make_unique<Circle>(5.0));
        shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));
        shapes.push_back(std::make_unique<Triangle>(3.0, 5.0));
        shapes.push_back(std::make_unique<Ellipse>(4.0, 2.0));

        for (const auto& shape : shapes) {
            std::cout << "Area: " << shape->get_area() << "\n";
            std::cout << "Perimeter: " << shape->get_perimeter() << "\n";
            auto [cx, cy] = shape->get_centroid();
            std::cout << "Centroid: (" << cx << ", " << cy << ")\n";
            std::cout << "Moment of Inertia: " << shape->get_moment_of_inertia() << "\n\n";
        }
    } catch (const std::invalid_argument& e) {
        std::cerr << "Invalid shape: " << e.what() << std::endl;
    }
    return 0;
}