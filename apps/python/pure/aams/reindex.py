from managers import ElasticSearchManager



if __name__ == "__main__":
    es_manager = ElasticSearchManager()

    # source_index = "omnium_vega_chats_v_1_3___alias_2024_09_monthly"
    # target_index = "omn-backup-2"

    # # Copy the source index to the new target index
    # es_manager.copy_index(source_index, target_index)

    # Define old and new index names
    old_index = 'new_index_name'
    new_index = 'omnium_vega_chats_v_1_3___alias_2024_09_monthly'

    # Define the new mapping
    new_mapping = {
        "mappings": {
            "properties": {
            "deleted": { "type": "boolean" },
            "id": { "type": "text" },
            "type": { "type": "keyword" },
            "env": { "type": "keyword" },
            "name": { "type": "text" },
            "metadata": {
                "type": "object",
                "properties": {
                    "languages": { "type": "text" },
                    "latex_report": { "type": "text" },
                    "chat_settings": { "type": "object" },
                    "session_id": { "type": "keyword" },
                    "client_type": { "type": "keyword" },
                    "env": { "type": "text" },
                    "chat_settings": {
                        "type": "nested",
                        "properties": {
                            "AudioStreaming": { "type": "boolean" },
                            "Voice": { "type": "text" }
                        }
                    },
                    "chat_history": {
                        "type": "nested",
                        "properties": {
                            "role": { "type": "keyword" },
                            "content": { "type": "text" }
                        }
                    },
                    "chat_profile": { "type": "keyword" },
                    "chat_id": { "type": "integer" },
                    "root_message": { "type": "text" },
                    "http_referer": { "type": "keyword" },
                    "profile_object": { "type": "object" },
                    "id": { "type": "keyword" },
                    "user": { "type": "object" }
                }
            },
            "tags": { "type": "keyword" },
            "createdAt": { "type": "date" },
            "userId": { "type": "keyword" },
            "userIdentifier": { "type": "keyword" },
            "steps": {
                "type": "nested",
                "properties": {
                    "metadata": { "type": "object" },
                    "indent": { "type": "integer" },
                    "start": { "type": "date" },
                    "waitForAnswer": { "type": "boolean" },
                    "language": { "type": "keyword" },
                    "latex_report": { "type": "text" },
                    "type": { "type": "keyword" },
                    "parentId": { "type": "keyword" },
                    "tags": { "type": "keyword" },
                    "threadId": { "type": "text" },
                    "output": { "type": "text" },
                    "created_at": { "type": "date" },
                    "streaming": { "type": "boolean" },
                    "isError": { "type": "boolean" },
                    "disable": { "type": "boolean" },
                    "name": { "type": "text" },
                    "end": { "type": "date" },
                    "counter": { "type": "integer" },
                    "role": { "type": "keyword" },
                    "content": { "type": "text" },
                    "id": { "type": "text" },
                    "prompt_tokens": {"type": "integer" },
                    "completion_tokens": {"type": "integer" },
                    "disableFeedback": { "type": "boolean" },
                    "feedbacks": {
                        "type": "nested",
                        "properties": {
                            "id": { "type": "text" },
                            "value": { "type": "integer" },
                            "comment": { "type": "text" }
                        }
                    }
                }
              }
            }
        }
    }
    

    # # Modifiy index mappins
    # es_manager.modify_index(old_index, new_index, new_mapping)
    
    
    
    
    


    # Update settings:
    index = 'new_index_name'
    settings = {
        "index": {
            "number_of_replicas": 3
        }
    }

    
    es_manager.set_index_settings(index, settings)
