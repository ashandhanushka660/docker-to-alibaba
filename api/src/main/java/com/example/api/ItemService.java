package com.example.api;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
    private final ItemRepository repo;

    public ItemService(ItemRepository repo) { this.repo = repo; }

    public List<Item> all() { return repo.findAll(Sort.by("id")); }

    public Item create(Item i) { i.setId(null); return repo.save(i); }

    public Optional<Item> update(Long id, Item in) {
        return repo.findById(id).map(e -> {
            e.setName(in.getName());
            e.setDescription(in.getDescription());
            return repo.save(e);
        });
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
