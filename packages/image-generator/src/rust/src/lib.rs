use cgmath::{Matrix4, Point3, Rad, Vector4};
use image::{ImageBuffer, Rgb};
use wasm_bindgen::prelude::*;

const BACKGROUND_COLOR: Rgb<u8> = Rgb([255, 255, 255]);
const CUBE_COLOR: Rgb<u8> = Rgb([0, 0, 0]);

pub fn render_image(width: u32, height: u32, x: i32, y: i32, z: i32) {}

#[wasm_bindgen]
pub fn get_raw_image_buffer(width: u32, height: u32, x: i32, y: i32, z: i32) -> Vec<u8> {
    let mut img = ImageBuffer::from_pixel(width, height, BACKGROUND_COLOR);

    draw_cube(&mut img, width, height, x, y, z);
    img.into_raw()
}

// Преобразование точки через матрицу
fn transform_point(matrix: &Matrix4<f32>, point: Point3<f32>) -> Point3<f32> {
    let vector = Vector4::new(point.x, point.y, point.z, 1.0);
    let transformed = matrix * vector;
    Point3::new(transformed.x, transformed.y, transformed.z)
}

fn project_point(p: Point3<f32>, center: Point3<f32>) -> Point3<f32> {
    // Простая перспективная проекция
    Point3::new(center.x + p.x * 100.0, center.y - p.y * 100.0, p.z)
}

fn draw_line(
    img: &mut ImageBuffer<Rgb<u8>, Vec<u8>>,
    p0: Point3<f32>,
    p1: Point3<f32>,
    color: Rgb<u8>,
    width: u32,
    height: u32,
) {
    let (x0, y0) = (p0.x as i32, p0.y as i32);
    let (x1, y1) = (p1.x as i32, p1.y as i32);

    let dx = (x1 - x0).abs();
    let dy = -(y1 - y0).abs();
    let mut err = dx + dy;
    let (mut x, mut y) = (x0, y0);
    let (sx, sy) = (if x0 < x1 { 1 } else { -1 }, if y0 < y1 { 1 } else { -1 });

    loop {
        if x >= 0 && x < width as i32 && y >= 0 && y < height as i32 {
            img.put_pixel(x as u32, y as u32, color);
        }
        if x == x1 && y == y1 {
            break;
        }
        let e2 = 2 * err;
        if e2 >= dy {
            err += dy;
            x += sx;
        }
        if e2 <= dx {
            err += dx;
            y += sy;
        }
    }
}

fn draw_cube(
    img: &mut ImageBuffer<Rgb<u8>, Vec<u8>>,
    width: u32,
    height: u32,
    x: i32,
    y: i32,
    z: i32,
) {
    // Пример углов поворота в радианах
    let angle_x = Rad((x as f32).to_radians());
    let angle_y = Rad((y as f32).to_radians());
    let angle_z = Rad((z as f32).to_radians());

    // Определяем вершины куба
    let vertices = [
        Point3::new(-1.0, -1.0, -1.0),
        Point3::new(1.0, -1.0, -1.0),
        Point3::new(1.0, 1.0, -1.0),
        Point3::new(-1.0, 1.0, -1.0),
        Point3::new(-1.0, -1.0, 1.0),
        Point3::new(1.0, -1.0, 1.0),
        Point3::new(1.0, 1.0, 1.0),
        Point3::new(-1.0, 1.0, 1.0),
    ];

    // Определяем связи между вершинами
    let lines = [
        (0, 1),
        (1, 2),
        (2, 3),
        (3, 0),
        (4, 5),
        (5, 6),
        (6, 7),
        (7, 4),
        (0, 4),
        (1, 5),
        (2, 6),
        (3, 7),
    ];

    // Определяем матрицы поворота
    let rotation_x = Matrix4::from_angle_x(angle_x);
    let rotation_y = Matrix4::from_angle_y(angle_y);
    let rotation_z = Matrix4::from_angle_z(angle_z);

    // Итоговая матрица поворота
    let rotation = rotation_z * rotation_y * rotation_x;

    // Центральная точка изображения
    let center = Point3::new(width as f32 / 2.0, height as f32 / 2.0, 0.0);

    // Создаем изображение

    // Проецируем вершины куба и рисуем линии
    for &(start, end) in &lines {
        let p0 = transform_point(&rotation, vertices[start]);
        let p1 = transform_point(&rotation, vertices[end]);

        draw_line(
            img,
            project_point(p0, center),
            project_point(p1, center),
            CUBE_COLOR,
            width,
            height,
        );
    }
}
