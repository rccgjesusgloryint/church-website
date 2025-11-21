/**
 * URL Slug Utility Functions
 * 
 * This module provides utilities for converting event names into URL-friendly slugs
 * and generating consistent gallery URLs across the application.
 */

/**
 * Converts a string into a URL-friendly slug
 * 
 * This function takes any string (typically an event name) and transforms it into
 * a format suitable for use in URLs by:
 * 1. Converting all characters to lowercase
 * 2. Removing special characters (keeping only letters, numbers, spaces, and hyphens)
 * 3. Replacing spaces with hyphens
 * 4. Removing duplicate hyphens
 * 5. Trimming leading/trailing whitespace
 * 
 * @param text - The text to convert into a slug
 * @returns A lowercase, hyphenated string safe for URLs
 * 
 * @example
 * slugify("Easter Celebration 2024!") // returns "easter-celebration-2024"
 * slugify("Youth & Family Retreat") // returns "youth-family-retreat"
 * slugify("  Christmas   Service  ") // returns "christmas-service"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()                    // Convert to lowercase for consistency
    .replace(/[^\w\s-]/g, '')        // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-')            // Replace one or more spaces with a single hyphen
    .replace(/--+/g, '-')            // Replace multiple consecutive hyphens with single hyphen
    .trim();                          // Remove leading/trailing whitespace
}

/**
 * Generates a complete URL path for an event gallery page
 * 
 * This function creates a consistent URL structure for event galleries by combining
 * a URL-friendly slug of the event name with the event's numeric ID.
 * 
 * The resulting URL follows the pattern: /gallery/[event-slug]/[event-id]
 * 
 * @param eventName - The name of the event to create a slug from
 * @param eventId - The numeric ID of the event
 * @returns A complete URL path in the format /gallery/[slug]/[id]
 * 
 * @example
 * generateGalleryUrl("Christmas Service", 123) 
 * // returns "/gallery/christmas-service/123"
 * 
 * generateGalleryUrl("Youth Retreat 2024", 456)
 * // returns "/gallery/youth-retreat-2024/456"
 */
export function generateGalleryUrl(eventName: string, eventId: number): string {
  const slug = slugify(eventName);
  return `/gallery/${slug}/${eventId}`;
}
