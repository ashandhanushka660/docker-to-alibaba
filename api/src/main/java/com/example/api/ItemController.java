package com.example.api;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService service;

    public ItemController(ItemService service) { this.service = service; }

    @GetMapping
    public List<Item> all() { return service.all(); }

    @PostMapping
    public Item create(@RequestBody Item item) { return service.create(item); }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable Long id, @RequestBody Item item) {
        return service.update(id, item).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
