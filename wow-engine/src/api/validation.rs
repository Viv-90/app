pub fn validate_stellar_address(addr: &str) -> Result<(), String> {
    if addr.len() != 56 {
        return Err("Stellar address must be exactly 56 characters long".to_string());
    }
    if !addr.starts_with('G') {
        return Err("Stellar address must start with 'G'".to_string());
    }
    for c in addr.chars() {
        if !c.is_ascii_uppercase() && !('2'..='7').contains(&c) {
            return Err("Stellar address contains invalid characters (must be uppercase alphanumeric base32)".to_string());
        }
    }
    Ok(())
}

pub fn validate_asset_code(asset: &str) -> Result<(), String> {
    if asset.is_empty() {
        return Err("Asset code cannot be empty".to_string());
    }
    
    if asset.starts_with("stellar:") {
        let parts: Vec<&str> = asset.split(':').collect();
        if parts.len() != 3 {
            return Err("Invalid fully qualified Stellar asset format. Must be stellar:CODE:ISSUER".to_string());
        }
        let code = parts[1];
        let issuer = parts[2];
        validate_stellar_address(issuer)?;
        if code.is_empty() || code.len() > 12 {
            return Err("Asset code must be between 1 and 12 characters".to_string());
        }
        return Ok(());
    }

    if asset.starts_with("iso4217:") {
        let parts: Vec<&str> = asset.split(':').collect();
        if parts.len() != 2 || parts[1].len() != 3 {
            return Err("Invalid ISO-4217 asset format. Must be iso4217:CURRENCY (e.g. iso4217:USD)".to_string());
        }
        return Ok(());
    }

    if asset.len() > 12 {
        return Err("Asset code must be 12 characters or fewer".to_string());
    }

    for c in asset.chars() {
        if !c.is_ascii_alphanumeric() {
            return Err("Asset code must be alphanumeric".to_string());
        }
    }

    Ok(())
}
