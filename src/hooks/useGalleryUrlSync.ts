"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useGalleryUrlSync = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const normalizeFilter = useCallback((val: string | null): string => {
    if (!val) return "";
    const lower = val.trim().toLowerCase();
    if (lower === "photo" || lower === "photos") return "Photo";
    if (lower === "vector" || lower === "vectors") return "Vector";
    return val.trim();
  }, []);

  // Initialize from searchParams
  const initialSearch = searchParams.get("search") || searchParams.get("q") || "";
  const initialFilter = normalizeFilter(searchParams.get("filter") || searchParams.get("category"));

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

  // Sync state if browser Back / Forward navigation is used
  useEffect(() => {
    const urlSearch = searchParams.get("search") || searchParams.get("q") || "";
    const urlFilter = normalizeFilter(searchParams.get("filter") || searchParams.get("category"));
    setSearchQuery(urlSearch);
    setActiveFilter(urlFilter);
  }, [searchParams, normalizeFilter]);

  // Safe URL updater
  const updateUrl = useCallback(
    (newSearch: string, newFilter: string) => {
      const params = new URLSearchParams();
      const cleanSearch = newSearch.trim();
      const cleanFilter = newFilter.trim();

      if (cleanSearch) params.set("search", cleanSearch);
      if (cleanFilter) params.set("filter", cleanFilter);

      const qs = params.toString();
      const targetUrl = qs ? `${pathname}?${qs}` : pathname;
      router.replace(targetUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Debounced URL sync when user types into search box
  useEffect(() => {
    const timer = setTimeout(() => {
      const urlSearch = searchParams.get("search") || searchParams.get("q") || "";
      const urlFilter = normalizeFilter(searchParams.get("filter") || searchParams.get("category"));

      if (searchQuery.trim() !== urlSearch.trim() || activeFilter.trim() !== urlFilter.trim()) {
        updateUrl(searchQuery, activeFilter);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, activeFilter, searchParams, normalizeFilter, updateUrl]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    updateUrl(searchQuery, filter);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveFilter("");
    updateUrl("", "");
  };

  return {
    searchQuery,
    activeFilter,
    handleSearchChange,
    handleFilterChange,
    handleResetFilters,
  };
};
