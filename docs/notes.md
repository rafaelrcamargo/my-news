```py
from transformers import pipeline

model = "facebook/bart-large-mnli"

article = "A foldable phone, new tablet and lots of AI: What Google unveiled at its big developer event - CNN"
candidate_labels = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
]

classifier = pipeline("zero-shot-classification", model)
result = classifier(article, candidate_labels)

print("The article is about:", result["labels"][0])
```
